<?php

namespace HungLT\Console;

use Illuminate\Console\GeneratorCommand;
use Illuminate\Support\Str;
use Symfony\Component\Console\Input\InputOption;

class RouterMakeCommand extends GeneratorCommand
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'make:base_vue_router';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new file router';

    /**
     * The type of class being generated.
     *
     * @var string
     */
    protected $type = 'Router';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        if (parent::handle() === false && ! $this->option('force')) {
            return;
        }
    }

    /**
     * Get the stub file for the generator.
     *
     * @return string
     */
    protected function getStub()
    {
        return __DIR__.'/stubs/router.stub';
    }

    /**
     * Get the default namespace for the class.
     *
     * @param  string  $rootNamespace
     * @return string
     */
    protected function getDefaultNamespace($rootNamespace)
    {
        return $rootNamespace.'\Routers';
    }
    public function passNameClass($name_class){
        $class_name = explode('_', $name_class);
        $class_name = array_map(function ($item){
            return ucfirst($item);
        },$class_name);
        return implode($class_name);
    }
    protected function getPath($rootNamespace){
        $all_sub =  explode('\\', $rootNamespace);
        $all_sub[count($all_sub) - 1] = $this->passNameClass($all_sub[count($all_sub) - 1]);
        $path_router = implode('\\',$all_sub);
        return $path_router.'.php';
    }
    protected function replaceClass($stub, $name)
    {
        $class = str_replace($this->getNamespace($name).'\\', '', $name);
        $class = $this->passNameClass($class);
        return str_replace('DummyClass', $class, $stub);
    }
    /**
     * Get the console command options.
     *
     * @return array
     */
    protected function getOptions()
    {
        return [
            ['force', 'f', InputOption::VALUE_NONE, 'Create the class even if the repository already exists.'],
        ];
    }
}
