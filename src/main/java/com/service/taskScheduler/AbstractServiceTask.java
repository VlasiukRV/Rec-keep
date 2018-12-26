package com.service.taskScheduler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public abstract class AbstractServiceTask extends Thread implements IServiceTask{

    private String taskName = "";
    private Boolean execute = false;
    private Boolean taskIsRunning = false;

    private static final Logger logger = LoggerFactory.getLogger(AbstractServiceTask.class);

    public AbstractServiceTask(){
        setExecute(false);
    }

    protected void setTaskName(String taskName){
        this.taskName = taskName;
    }

    @Override
    public String getTaskName() {
        return taskName;
    }

    protected void setExecute(Boolean execute){
        this.execute = execute;
    }

    @Override
    public Boolean isExecute() {
        return execute;
    }

    public void runYet() {
        this.taskIsRunning = false;
    }

    @Override
    public Boolean isRun() {
        return isAlive();
    }

    public void stopTask(){
        this.interrupt();
    }

    protected abstract boolean runServiceTask();

    @Override
    public void run() {
        logger.info("" +getName()+ " start");
        do {
            if (Thread.interrupted())    //Проверка прерывания
            {
                break;
            }

            if(!this.taskIsRunning) {
                try {
                    this.taskIsRunning = true;
                    runServiceTask();
                } catch (Exception e) {
                    logger.error(e.getMessage());
                }
            }

            try {
                Thread.sleep(10000);        //Приостановка потока на 1 сек.
            } catch (InterruptedException e) {
                break;    //Завершение потока после прерывания
            }
        }
        while (true);
        this.execute = true;
        logger.info("" +getName()+ " stop");
    }

}
