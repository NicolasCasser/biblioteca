import { Admin } from 'src/modules/admin/entities/admin.entity';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });
const password = process.env.ADMIN_PASSWORD;

/**
 * Script de inicialização para o usuário administrador.
 * Garante que o sistema sempre possua um operador cadastrado no db.
 */
export async function seedAdmin(dataSource: DataSource) {
  const adminRepo = dataSource.getRepository(Admin);
  const adminExists = await adminRepo.findOneBy({ name: 'admin' });

  if (!adminExists) {
    const hash = await bcrypt.hash(password as string, 10);
    await adminRepo.save({ name: 'admin', password: hash });
  }
}
