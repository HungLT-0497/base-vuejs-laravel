<?php

namespace HungLT\Console;

use Illuminate\Console\Command;
use Illuminate\Support\Str;
use Illuminate\Console\GeneratorCommand;
use Symfony\Component\Console\Input\InputOption;

class SetupVue extends Command
{
    /**
     * The console command name.
     *
     * @var string
     */

    protected $name = 'run:setup_vue';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Install and setup package';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
       $this->installLib();
        $this->setupAntd();
        $this->setupVuex();

    }
    protected function setupAntd(){
        $path_js = base_path('resources\js');

        $content_app = file_get_contents($path_js.'\app.js');
        $content_app = substr($content_app, 0,strpos($content_app, 'import')).
            'import Antd from "ant-design-vue";
Vue.use(Antd);
'
            .substr($content_app, strpos($content_app, 'import'));
        $this->line('Đã cài đặt xong thư viện, tiếp tục setup vuex');
       file_put_contents($path_js.'\app.js', $content_app);
    }

    protected function setupVuex(){
        $path_js = base_path('resources\js\store');

        $content_app = file_get_contents($path_js.'\store.js');

        $content_app = substr($content_app, 0,strpos($content_app, 'import')).
            'import storeBase from "../base/JS/Store/store";
'.substr($content_app, strpos($content_app, 'import'));

        $count = 0;
       for ($i = 0; $i < strlen($content_app) ; $i++){
           if ($content_app[$i] == '{'){
               $count ++;
               if ($count == 2){
                   $content_app = substr($content_app, 0,$i+1).
                       '
       ...storeBase,'.substr($content_app, $i+1);
               }
           }
       }
        file_put_contents($path_js.'\store.js', $content_app);
        $this->line('Hoàn thành');
    }

    protected function installLib()
    {
        $path_vendor = base_path('vendor');

        // cài đặt gói antd
        $path_copy_css = $path_vendor.'\hunglt\base-repository-laravel\lib\antd.css';
        $path_css = base_path('node_modules\ant-design-vue\dist');
        shell_exec('npm install ant-design-vue --save');
        $this->line('Đã cài đặt xong thư viện, tiếp tục chèn css customize');


        //Xóa file antd.css có sẵn, chèn file css của mình vào
        $command_remove = 'rm '.$path_css.'\antd.css';
        $command_copy = 'cp '.$path_copy_css. ' '.$path_css.'\antd.css';
        shell_exec($command_remove);
        shell_exec($command_copy);
        $this->line('Thay đổi css thành công, tiếp tục setup base component');

        //Cài đặt folder base của vue
        $path_copy_vue = $path_vendor.'\hunglt\base-repository-laravel\base\lib\base';
        $path_paste_vue = base_path('resources\js');
        $command_copy_vue = 'cp -avr '.$path_copy_vue. ' '.$path_paste_vue;
        shell_exec($command_copy_vue);
        $this->line('Hoàn thành setup');
    }
}
