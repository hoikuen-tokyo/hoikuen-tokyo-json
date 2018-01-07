
all: data/2017/tokyo.json

node_modules:
	npm install

data/2017/tokyo.json: node_modules
	mkdir -p data/2017
	npx ts-node src/batch.ts > $@
