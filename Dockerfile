FROM node:20.11.0-alpine AS base

RUN npm install -g pnpm

COPY . /usr/www/app
WORKDIR /usr/www/app