gendiff:
	node bin/gendiff.js
makelint:
	npx eslint .
install:
	npm ci
publish:
	npm publish --dry-run
lint:
	npx eslint .
test: 
	npm test
test-coverage:
	npm test -- --coverage --coverageProvider=v8