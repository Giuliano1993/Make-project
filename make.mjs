import 'zx/globals'

const file = fs.readFileSync('./.env.yaml','utf8');
const env = YAML.parse(file)
//const projectsPath = "C:/Users/giuli/Desktop/Projects";
const projectsPath = env.PROJECTSDIR;


let name;
if(!argv.name) {
  name = await question('Project name: ');
}else{
  name = argv.name;
}

let projectType

if(!argv.type) {
  projectType = await question('Project type [PHP|Node|Rust]: ');
}else{
  projectType = argv.type;
}
cd(projectsPath)
await $`mkdir ${name}`;
cd(name);
switch (projectType) {
    case "PHP":
        await $`touch index.php`;
        await $`echo "<?php \n\r echo 'Hello World';" > index.php`
        break;
    case "Node":
        await $`npm init -y`
        await $`touch index.js`;
        await $`echo "console.log('Hello, World!')" > index.js`;
        break;
    case "Rust":
        await $`cargo.exe init`
        break;
    default:
        console.log("Not a valid project type")
        break;
}

await $`touch README.md`;
await $`echo "# ${name}" > README.md`;
