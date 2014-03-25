(function($) {
    var gameSpeed = 100;
    
    var Player = function(arena) {
        this.arena = arena;
        this.elem = $('<div class="player" />');
        
        this.movement();
        this.arena.append(this.elem);
        
        
    };
    
    Player.prototype.movement = function() {
        var self = this;
        var keyMap = {};
        $(window).on('keydown', function(e) {
            e.preventDefault();
            if(!keyMap[e.keyCode]) {
                keyMap[e.keyCode] = true;
                switch(e.keyCode) {
                    case 37:
                        self.elem.addClass('move-left');
                        break;
                    case 39:
                        self.elem.addClass('move-right');
                        break;
                }
            }
        });
        
        $(window).on('keyup', function(e) {
            e.preventDefault();
            if(e.keyCode in keyMap) {
                keyMap[e.keyCode] = false;
                switch(e.keyCode) {
                    case 37:
                        self.elem.removeClass('move-left');
                        break;
                    case 39:
                        self.elem.removeClass('move-right');
                        break;
                }
            }
        });
        
        // movement loop
        setInterval(function() {
            for(var code in keyMap) {
                if(keyMap[code]) {
                    switch(code) {
                        case '37': 
                            var pos =self.elem.position().left - gameSpeed;
                            if(pos > 0) {
                                self.elem.css({'left': pos});
                            } else {
                                self.elem.css({'left': 0});
                            }
                            break;
                        case '39':
                            var pos = self.elem.position().left + gameSpeed;
                            if(pos < self.arena.width() - self.elem.width()) {
                                self.elem.css({'left': pos} );
                            } else {
                                self.elem.css({'left': self.arena.width() - self.elem.width()});
                            }
                            break;
                        case '32': 
                            $(window).trigger('player:fire');
                            break;
                    }
                }
            }
        }, 50);
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
        this.elem.animate({bottom: this.arena.height()},500, function() {
            self.elem.removeAttr('style');
        });
    };
    
    var BulletPool = function(arena) {
        this.pool = [];
        this.arena = arena;
        this.index = 0;
        
        for(var i =0; i < 100; i++) {
            this.pool.push(new Bullet(this.arena));
        }
    };
    
    BulletPool.prototype.pull = function() {
        var bullet = this.pool[this.index];
        this.index = this.index + 1;
        
        if(this.index > this.pool.length - 1) {
            this.index = 0;
        }
        
        return bullet;
    };
    
    
    // plugin
    $.fn.divInvaders = function() {
        var player = new Player(this);
        var bulletPool = new BulletPool(this);
        
        player.onFire(function() {
            var bullet = bulletPool.pull();
            
            var left = player.elem.position().left;
            if(bulletPool.index % 2 === 0) {
                left += player.elem.width() - bullet.elem.width();
            }
            
            
            bullet.elem.css({
                left: left,
                bottom: player.elem.height() - bullet.elem.height()*1.7
            });
            bullet.fire();
        });
    };
})(jQuery);