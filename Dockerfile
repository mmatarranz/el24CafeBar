FROM nginx:alpine

# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar archivos estáticos al directorio web de Nginx
COPY . /usr/share/nginx/html

# Puertos expuestos (80 estándar y 3000 por compatibilidad con Coolify)
EXPOSE 80 3000

CMD ["nginx", "-g", "daemon off;"]
