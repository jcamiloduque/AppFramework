<?php
namespace Command\Serve;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class ServeCommand extends Command
{
    protected $command = 'serve';
    protected $description = "Serve the application on the PHP development server";

    protected $commandOptionName = "cap"; // should be specified like "app:greet John --cap"
    protected $commandOptionDescription = 'If set, it will greet in uppercase letters';

    protected function configure()
    {
        $this
            ->setName($this->command)
            ->setDescription($this->description)
            ->addOption(
                'host',
                null,
                InputOption::VALUE_OPTIONAL,
                'Desired host',
                '127.0.0.1'
            )
            ->addOption(
                'port',
                null,
                InputOption::VALUE_OPTIONAL,
                'Desired port',
                '8000'
            )
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output){
        $host = $input->getOption('host');
        $port = $input->getOption('port');
        chdir(BASE_PATH."/public/");
        $output->writeln("<info>App development server started:</info> <http://{$host}:{$port}>");
        passthru($this->serverCommand($host, $port));
    }

    protected function serverCommand($host, $port){
        return sprintf('%s -S %s:%s %s/server.php',
            ProcessUtils::escapeArgument((new PhpExecutableFinder)->find(false)),
            $host,
            $port,
            BASE_PATH
        );
    }
}