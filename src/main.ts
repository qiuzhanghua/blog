import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  const port = parseInt(process.env.HTTP_PORT) | 3000; // from Command line only
  await app.listen(port);
  return port;
}

bootstrap().then((port) => {
  console.log(`Http Server is started at port: ${port} ...`);
});
