FROM  node:20-alpine3.17

WORKDIR /app

RUN apk add --update \
    git \
    openssh-client

COPY . .

# Set the NODE_ENV environment variable based on the ENV build argument
ARG ENV

RUN if [ "$ENV" = "development" ]; then \
        cp ./bin/development.env .env; \
    elif [ "$ENV" = "production" ]; then \
        cp ./bin/production.env .env; \
    fi

# Set the NODE_ENV environment variable
RUN npm install

# Use the updated build command with NODE_ENV
RUN npm run build

CMD ["npm", "run", "start"]