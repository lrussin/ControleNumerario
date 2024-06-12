# Etapa 1: Construir a aplicação Angular
FROM node:18 AS build
WORKDIR /app

# Copiar arquivos de dependências e instalar dependências
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copiar todo o código fonte
COPY . ./

# Substituir a variável de ambiente diretamente no arquivo environment.prod.ts
ARG BACKEND_URL
RUN sed -i 's|BASE_API_URL_PLACEHOLDER|'${BACKEND_URL}'|g' src/environments/environment.prod.ts

# Construir a aplicação
RUN npm run build --prod

# Etapa 2: Configurar o Nginx para servir a aplicação Angular
FROM nginx:alpine
COPY --from=build /app/dist/coreui-free-angular-admin-template /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY certs /etc/nginx/certs

EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
