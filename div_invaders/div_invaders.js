(function($) {
    var gameSpeed = 30;
    
    var Player = function(arena) {
        this.arena = arena;
        this.elem = $('<div class="player" />');
        
        this.movement();
        this.arena.append(this.elem);
        
        
    };
    
    Player.prototype.movement = function() {
        var self = this;
        $(window).on('keydown', function(e) {
            switch(e.keyCode) {
                case 37: 
                    var pos =self.elem.position().left - gameSpeed;
                    if(pos > 0) {
                        self.elem.css({'left': pos});
                    }
                    break;
                case 39:
                    var pos = self.elem.position().left + gameSpeed;
                    if(pos < self.arena.width() - self.elem.width()) {
                        self.elem.css({'left': pos} );
                    }
                    break;
                case 32: 
                    $(window).trigger('player:fire');
                    break;
            }
        });
    };
    
    Player.prototype.onFire = function(callback) {
        $(window).on('player:fire', callback);
    };
    
    var Bullet = function(arena) {
        this.elem = $('<div class="bullet" />');
        this.arena = arena;
        
        this.arena.append(this.elem);
    };
    
    Bullet.prototype.fire = function() {
        var self = this;
        this.elem.animate({bottom: this.arena.height() - this.elem.height()},500, function() {
            self.elem.removeAttr('style');
        });
    };
    
    $.fn.divInvaders = function() {
        var player = new Player(this);
        var bullet = new Bullet(this);
        
        player.onFire(function() {
            var left = player.elem.position().left;
            
            bullet.elem.css({
                left: left + ((player.elem.width()/2) - bullet.elem.width()/2),
                bottom: player.elem.height()
            });
            bullet.fire();
        });
        
        
        console.log(player);
    };
})(jQuery);