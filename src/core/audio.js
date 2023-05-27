
class AudioService{
    static musicMuted=false;
    static sfxMuted=false;
    static musicVolume=0.1;
    static sfxVolume=0.2;

    static init(){
        AudioService.musicPlayer=new Audio();
        AudioService.sfxPlayer=new Audio();
    }

    //play music
    static playMusic(src,volume=0.1){
        AudioService.musicVolume=volume;
        AudioService.musicPlayer.volume=AudioService.musicVolume;
        AudioService.musicPlayer.oncanplaythrough=()=>{
            AudioService.musicPlayer.play();
        }
        AudioService.musicPlayer.src=src;
    }
    //play sfx
    static playSfx(src,volume=0.2){
        AudioService.sfxVolume=volume;
        AudioService.sfxPlayer.volume=sfxVolume;
        AudioService.sfxPlayer.oncanplaythrough=()=>{
            AudioService.sfxPlayer.play();
        }
        AudioService.sfxPlayer.src=src;
    }
    //stop music
    static stopMusic(){
        AudioService.musicPlayer.pause();
    }
    //stop sfx
    static stopSfx(){
        AudioService.sfxPlayer.pause();
    }

    //helpers
    static setMusicVolume(value){
        AudioService.musicVolume=value;
        AudioService.musicPlayer.volume=AudioService.musicMuted?0:AudioService.musicVolume;
    }
    static setSfxVolume(value){
        AudioService.sfxVolume=value;
        AudioService.sfxPlayer.volume=AudioService.sfxMuted?0:AudioService.sfxVolume;
    }
    static toggleMusicMute(value){
        AudioService.musicMuted=value?value:!AudioService.musicMuted;
        AudioService.musicPlayer.volume=AudioService.musicMuted?0:AudioService.musicVolume;
    }
    static toggleSfxMute(value){
        AudioService.sfxMuted=value?value:!AudioService.sfxMuted;
        AudioService.sfxPlayer.volume=AudioService.sfxMuted?0:AudioService.sfxVolume;
    }

}
