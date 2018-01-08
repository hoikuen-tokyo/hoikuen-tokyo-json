
all: data

node_modules:
	npm install

data: node_modules
	mkdir -p data/2017
	npx ts-node src/batch.ts > data/2017/tokyo.json

.PHONY: data
