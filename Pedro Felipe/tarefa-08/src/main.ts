import Fastify from 'fastify';
import { registerRoutes } from './app.module';

async function bootstrap() {
  const app = Fastify({ logger: true });

  // Registrar rotas
  await registerRoutes(app);

  // Iniciar servidor
  try {
    await app.listen({ port: 3000, host: '0.0.0.0' });
    console.log('✅ Servidor rodando em http://localhost:3000');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

bootstrap();
