rimraf build

export NODE_ENV=production

tsc -p ./tsconfig.build.json --pretty

cp -R public build/public

cp package.json build/
