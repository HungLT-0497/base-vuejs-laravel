<?php

namespace HungLT\Console;

use Illuminate\Support\Str;
use Illuminate\Console\GeneratorCommand;
use Symfony\Component\Console\Input\InputOption;

class ControllerMakeCommand extends GeneratorCommand
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $signature = 'make:base_vue_controller {name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new model';

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

    protected function buildClass($name)
    {
        $controllerNamespace = $this->getNamespace($name);

        $replace = [];
        $replace = $this->buildModelReplacements($replace);


        $replace["use {$controllerNamespace}\Controller;\n"] = '';

        return str_replace(
            array_keys($replace), array_values($replace), parent::buildClass($name)
        );
    }
    public function passNameClass($name_class){
        $class_name = explode('_', $name_class);
        $class_name = array_map(function ($item){
            return ucfirst($item);
        },$class_name);
        return implode($class_name);
    }
    /**
     * Build the model replacement values.
     *
     * @param  array  $replace
     * @return array
     */
    protected function buildModelReplacements(array $replace)
    {
        $modelClass = $this->argument('name');
        return array_merge($replace, [
            'DummyModelClass' => $this->passNameClass($modelClass),
        ]);
    }
    protected function replaceClass($stub, $name)
    {
        $class = str_replace($this->getNamespace($name).'\\', '', $name);
        $class = $this->passNameClass($class);
        return str_replace('DummyClass', $class, $stub);
    }

    /**
     * The type of class being generated.
     *
     * @var string
     */
    protected $type = 'Class';

    /**
     * Get the stub file for the generator.
     *
     * @return string
     */
    protected function getStub()
    {
        return __DIR__.'/stubs/controller.stub';
    }

    /**
     * Get the default namespace for the class.
     *
     * @param  string  $rootNamespace
     * @return string
     */
    protected function getDefaultNamespace($rootNamespace)
    {
        return $rootNamespace.'\Http\Controllers\Base';
    }
    protected function getPath($rootNamespace){
        $all_sub =  explode('\\', $rootNamespace);
        $all_sub[count($all_sub) - 1] = $this->passNameClass($all_sub[count($all_sub) - 1]);
        $path_router = implode('\\',$all_sub);
        return $path_router.'Controller.php';
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
