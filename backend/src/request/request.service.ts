// request.service.ts
import {
  Injectable,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';
import { Request as RequestEntity, RequestStatus } from './request.entity';
import { UsersService } from 'src/users/users.service';
import { DeclarationService } from 'src/declaration/declaration.service';
import { GeneratePdfDto } from './dto/generate-pdf.dto';

export interface FormatRequestType {
  id: string;
  name: string;
  requestDate: Date;
  status: RequestStatus;
  url?: string;
}

@Injectable()
export class RequestService {
  constructor(
    private readonly usersService: UsersService,
    private readonly declarationService: DeclarationService,

    @InjectRepository(RequestEntity)
    private requestRepository: Repository<RequestEntity>,
  ) {}

  async getRequests(userId: string): Promise<FormatRequestType[]> {
    const user = await this.usersService.findById(userId);
    if (user && !user.is_admin) {
      throw new ForbiddenException(
        'You do not have permission to perform this action.',
      );
    }

    const requests = await this.requestRepository.find({
      order: { createdAt: 'DESC' },
    });

    return requests.map((request: RequestEntity) => ({
      id: request.id,
      name: request.user.name,
      requestDate: request.createdAt,
      status: request.status,
    }));
  }

  async createRequest(
    declarationId: string,
    userId: string,
  ): Promise<RequestEntity> {
    const user = await this.usersService.findById(userId);
    if (user && user.is_admin) {
      throw new ForbiddenException(
        'You do not have permission to perform this action. 4',
      );
    }

    const declaration = await this.declarationService.findById(declarationId);
    if (!declaration) {
      throw new ForbiddenException('Declaration not found.');
    }

    const hasPendingRequest = await this.checkForPendingRequests(
      userId,
      declarationId,
    );
    if (hasPendingRequest) {
      throw new ConflictException(
        'You already have a pending request. Please wait for its completion before requesting again.',
      );
    }

    const request = this.requestRepository.create({
      user,
      declaration,
    });

    return this.requestRepository.save(request);
  }

  async getRequestsByUser(userId: string): Promise<RequestEntity[]> {
    return this.requestRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' }, // Ordena pela data de criação
    });
  }

  async checkForPendingRequests(
    userId: string,
    declarationId: string,
  ): Promise<boolean> {
    const pendingRequest = await this.requestRepository.findOne({
      where: {
        user: { id: userId },
        declaration: { id: declarationId },
        status: RequestStatus.PENDING, // Verificar se há uma solicitação com status 'pending'
      },
    });

    return !!pendingRequest; // Retorna true se existir uma solicitação pendente
  }

  async getRequestById(requestId: string): Promise<RequestEntity> {
    return await this.requestRepository.findOne({ where: { id: requestId } });
  }

  async generatePdf(
    userId: string,
    generatePdfDto: GeneratePdfDto,
  ): Promise<FormatRequestType[]> {
    const { declarationId, requestIds } = generatePdfDto;
    const user = await this.usersService.findById(userId);
    if (user && !user.is_admin) {
      throw new ForbiddenException(
        'You do not have permission to perform this action',
      );
    }

    const declaration = await this.declarationService.findById(declarationId);
    if (!declaration) {
      throw new ForbiddenException('Declaration not found.');
    }

    const requests: FormatRequestType[] = [];

    const replacePlaceholders = (
      template: string,
      data: Record<string, string>,
    ): string => {
      return Object.entries(data).reduce((result, [key, value]) => {
        return result.replace(new RegExp(`{{${key}}}`, 'g'), value);
      }, template);
    };

    const formatDate = (date: Date): string => {
      return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    };

    const formatCep = (cep) => {
      const sanitizedCep = cep.replace(/\D/g, '');
      const paddedCep = sanitizedCep.padStart(8, '0');
      return `${paddedCep.slice(0, 5)}-${paddedCep.slice(5)}`;
    };

    for (const requestId of requestIds) {
      const requestData = await this.getRequestById(requestId);

      if (!requestData) {
        throw new ForbiddenException(`Request not found for ID: ${requestId}`);
      }

      const userData = {
        nome: requestData.user.name,
        rua: requestData.user.street,
        numero_casa: requestData.user.house_number,
        complemento: requestData.user.complement
          ? ` ${requestData.user.complement}`
          : '',
        bairro: requestData.user.neighborhood,
        cidade: requestData.user.city,
        estado: requestData.user.state,
        cep: formatCep(requestData.user.postal_code),
        data_atual: formatDate(new Date()),
        rg: requestData.user.rg,
        cpf: requestData.user.cpf,
        orgao_emissor: requestData.user.issuing_agency,
      };

      const modifiedContent = replacePlaceholders(
        declaration.content,
        userData,
      );

      const footerContent = replacePlaceholders(declaration.footer, userData);

      const doc = new PDFDocument({ size: 'A4' });

      const writeStream = fs.createWriteStream('output.pdf');

      doc.pipe(writeStream);

      doc.moveDown(10);

      doc
        .font('Times-Bold')
        .fontSize(14)
        .text(declaration.title, { align: 'center' });

      doc.moveDown(4);

      const contentLines = modifiedContent.split('\\n');
      contentLines.forEach((line) => {
        doc.font('Times-Roman').fontSize(14).text(line.trim(), {
          align: 'justify',
          lineGap: 12,
          indent: 60,
        });

        doc.moveDown();
      });

      doc.moveDown();

      const footerLines = footerContent.split('\\n');
      footerLines.forEach((line) => {
        doc.font('Times-Roman').fontSize(14).text(line, {
          align: 'center',
          lineGap: 0,
        });
      });

      doc.moveDown();

      const oldBottomMargin = doc.page.margins.bottom;
      doc.page.margins.bottom = 0;
      doc
        .font('Times-Roman')
        .fontSize(9)
        .text(
          'Rua Francisca Júlia, nº 290 - Santana - CEP 02403-010 - São Paulo - SP - Tel.: (11) 2281.0300 - CNPJ 02.090.452/0001-37',
          75,
          doc.page.height - oldBottomMargin / 2,
          {
            align: 'center',
            lineGap: 0,
          },
        );

      doc.font('Times-Roman').fontSize(9).text('E-mail: adm@acnsf.org.br', {
        align: 'center',
        lineGap: 0,
      });
      doc.page.margins.bottom = oldBottomMargin;

      doc.end();

      writeStream.on('finish', () => {
        console.log('PDF gerado com sucesso!');
      });

      writeStream.on('error', (error) => {
        console.error('Erro ao salvar o PDF:', error);
      });
    }

    return requests;
  }
}
