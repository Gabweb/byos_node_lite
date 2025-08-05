ARG BUILD_FROM
FROM $BUILD_FROM

WORKDIR /app
RUN apk add --no-cache chromium nodejs=22.16.0-r2 npm=11.3.0-r0 imagemagick
#RUN apk add --no-cache chromium nodejs npm imagemagick
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
# against cache of package.json
COPY package.json ./
RUN npm i
COPY . ./

# Copy data for add-on
COPY run.sh /
RUN chmod a+x /run.sh

CMD [ "/run.sh" ]