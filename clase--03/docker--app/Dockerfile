FROM node
#Definimos una imagen base: NODE

WORKDIR /app
#Aca estamos creando una carpetita interna donde guardar nuestro proyecto. Generalmente se llama APP

COPY package.json .
#Copiamos el package.json a mi nueva carpeta (no se olviden el .)

RUN npm install 
#Que se ejecute el install despues de copiar el package.json

COPY . . 
#Copiamos el resto de la app

EXPOSE 8080
#Que puerto vamos a escuchar

CMD [ "npm", "start" ]
#Tiene que ejecutar el "npm start", no se olviden de agregar el script. 