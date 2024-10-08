import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

@Injectable()
export class UploadFileService {
  private supabase;

  constructor() {
    this.supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
      },
    });
  }

  async uploadStorage(
    bucket: string,
    fileName: string,
    file: any,
    contentType: string,
  ) {
    const { data: uploadData, error }: any = await this.supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
        contentType,
      });
    if (error) throw error;
    const { data } = await this.supabase.storage
      .from(bucket)
      .createSignedUrl(uploadData.path, 10080);
    return { ...data };
  }

  async deleteFileStorage(bucket: string, filePath: string) {
    const { data, error }: any = await this.supabase.storage
      .from(bucket)
      .remove([filePath]);
    if (error) throw error;
    return data;
  }
}
