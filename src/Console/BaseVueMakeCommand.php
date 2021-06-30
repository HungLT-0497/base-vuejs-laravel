<?php

namespace HungLT\Console;

use Illuminate\Support\Str;
use Illuminate\Console\GeneratorCommand;
use Symfony\Component\Console\Input\InputOption;

class BaseVueMakeCommand extends GeneratorCommand
{
    /**
     * The console command name.
     *
     * @var string
     */

    protected $name = 'make:base_vue';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create combo base';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
       $this->runCommand();
    }
    protected function runCommand()
    {
        $repositoryName= Str::studly(class_basename($this->argument('name')));
        $this->call('make:base_vue_controller', [
            'name' => $this->argument('name'),
        ]);
        $this->call('make:base_vue_model', [
            'name' => $this->argument('name'),
        ]);
        $this->call('make:base_vue_router', [
            'name' => $this->argument('name'),
        ]);
    }

    /**
     * The type of class being generated.
     *
     * @var string
     */
    protected $type = 'Repository';
    public function getStub()
    {
        return null;
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
