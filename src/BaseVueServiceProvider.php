<?php

namespace HungLT;

use Illuminate\Support\ServiceProvider;
use HungLT\Console\ModelMakeCommand;
use HungLT\Console\ControllerMakeCommand;
use HungLT\Console\RouterMakeCommand;
use HungLT\Console\BaseVueMakeCommand;
use HungLT\Console\SetupVue;

class BaseVueServiceProvider extends ServiceProvider
{
    protected $commands = [
        ControllerMakeCommand::class,
        SetupVue::class,
        BaseVueMakeCommand::class,
        ModelMakeCommand::class,
        RouterMakeCommand::class
    ];
    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        $this->commands($this->commands);
    }
    public function provides()
    {
        return ['base_vue'];
    }
}
