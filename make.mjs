import 'zx/globals'


const file = fs.readFileSync('./.env.yaml','utf8');
const env = YAML.parse(file)
//const projectsPath = "C:/Users/giuli/Desktop/Projects";
const projectsPath = env.PROJECTSDIR;
const composerPath = env.COMPOSERPATH;


let name;
if(!argv.name) {
  name = await question('Project name: ');
}else{
  name = argv.name;
}

let projectType

if(!argv.type) {
  projectType = await question('Project type [PHP|Node|Rust|Laravel]: ');
}else{
  projectType = argv.type;
}
cd(projectsPath)
await $`mkdir ${name}`;
cd(name);
await $`git init -q`;
await $`touch .gitignore`;
switch (projectType) {
    case "PHP":
        await $`touch index.php`;
        await $`echo "<?php \n\r echo 'Hello World';" > index.php`
        break;
    case "Node":
        await $`npm init -y`
        await $`touch index.js`;
        await $`echo "console.log('Hello, World!')" > index.js`;
        await $`echo "node_modules" > .gitignore`
        break;
    case "Rust":
        const CARGO = os.platform() === 'win32' ? 'cargo.exe' : 'cargo';
        await $`${CARGO} init`;
        break;
    case "Laravel":
        const PHP = os.platform() === 'win32' ? 'php.exe' : 'php';
        await $`${PHP} ${composerPath} create-project laravel/laravel .`
        await $`npm install`
        await $`${PHP} artisan key:generate`
        await $`echo "node_modules \n\r" > .gitignore`
        await $`echo "vendor" > .gitignore`
        //await $`php artisan serve`
        break;
    default:
        console.log("Not a valid project type")
        break;
}

await $`touch README.md`;
await $`echo "# ${name}" > README.md`;

if(argv.code){
  await $`code .`;
}
