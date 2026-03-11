import { AppDataSource } from './data-source';
import { seedAdmin } from './seeds/seed-Admin';

async function runSeeds() {
  await AppDataSource.initialize();

  await seedAdmin(AppDataSource);

  await AppDataSource.destroy();
}

runSeeds().catch((err) => {
  console.error('❌ Error during seeding:', err);
  process.exit(1);
});
