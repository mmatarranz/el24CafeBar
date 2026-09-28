FROM nginx:alpine

# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar archivos estáticos al directorio web de Nginx
COPY . /usr/share/nginx/html

# Puerto HTTP estándar
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
