(function(){
    var draggable = document.querySelector('.box1');
    var dx1, dy1, dx2, dy2, mx1, my1, dx, dy, mx, my, dl, dh;
    var mousePress = 0;
    var action = '';

    var cursorClass = 'default';

    cursorClasses = [
        'default', 
        'cursor-move', 
        'n-resize', 
        's-resize', 
        'e-resize', 
        'w-resize', 
        'nw-resize',
        'ne-resize',
        'se-resize',
        'sw-resize'
    ];

    var dDrag = function(e) {
        mx = e.clientX;
        my = e.clientY;
        var mxdiff = mx - mx1;
        var mydiff = my - my1;
        dx = dx1 + mxdiff;
        dy = dy1 + mydiff;

        draggable.style.top = dy + 'px';
        draggable.style.left = dx + 'px';
    };

    var dResize = function(e) {
        mx = e.clientX;
        my = e.clientY;
        var mxdiff = mx - mx1;
        var mydiff = my - my1;
        dx = dx1 + mxdiff;
        dy = dy1 + mydiff;

        
        switch(cursorClass) {
            case 'nw-resize':

                draggable.style.left = dx1 + mxdiff + 'px';
                draggable.style.width = dl - mxdiff + 'px';

                draggable.style.top = dy1 + mydiff + 'px';
                draggable.style.height = dh - mydiff + 'px';

                break;

            case 'ne-resize':
                draggable.style.left = dx1;
                draggable.style.width = dl + mxdiff + 'px';

                draggable.style.top = dy1 + mydiff + 'px';
                draggable.style.height = dh - mydiff + 'px';
                break;

            case 'se-resize':
                draggable.style.width = dl + mxdiff + 'px';
                draggable.style.height = dh + mydiff + 'px';
                break;

            case 'sw-resize':
                draggable.style.left = dx1 + mxdiff + 'px';
                draggable.style.width = dl - mxdiff + 'px';

                draggable.style.top = dy1;
                draggable.style.height = dh + mydiff + 'px';
                break;
            
            case 'n-resize':
                draggable.style.top = dy1 + mydiff + 'px';
                draggable.style.height = dh - mydiff + 'px';
                break;
            
            case 'e-resize':
                draggable.style.left = dx1;
                draggable.style.width = dl + mxdiff + 'px';
                break;
            
            case 's-resize':
                draggable.style.height = dh + mydiff + 'px';
                break;
            
            case 'w-resize':
                draggable.style.left = dx1 + mxdiff + 'px';
                draggable.style.width = dl - mxdiff + 'px';
                break;
        }
    };

    var dMouseDown = function(e) {
        console.log('mouse down');
        mousePress++;
        mx1 = e.clientX;
        my1 = e.clientY;
        dx1 = draggable.offsetLeft;
        dy1 = draggable.offsetTop;
        dl = draggable.offsetWidth;
        dh = draggable.offsetHeight;
        dx2 = dx1 + dl;
        dy2 = dy1 + dh;

        console.log('mx1:'+mx1+' my1:'+my1+' dx1:'+dx1+' dy1:'+dy1);

        if( action === 'drag' ) {
            draggable.addEventListener('mousemove', dDrag);
        }
        else if( action === 'resize' ) {
            window.addEventListener('mousemove', dResize);
        }
        
    };

    var dMouseUp = function(e) {
        mousePress--;
        draggable.removeEventListener('mousemove', dDrag);
        window.removeEventListener('mousemove', dResize);
        console.log('mouse up');
    };

    var dMouseInside = function(e) {
        var mx = e.clientX;
        var my = e.clientY;
        var dx1 = draggable.offsetLeft;
        var dx2 = dx1 + draggable.offsetWidth;
        var dy1 = draggable.offsetTop;
        var dy2 = dy1 + draggable.offsetHeight;

        if( mx > dx1+5 && mx < dx2-5 && my > dy1+5 && my < dy2-5 && mousePress === 0 ) {
            cursorClass = 'cursor-move';
            action = 'drag';
        }
        else if( my >= dy1 && my <= dy1+5 && mx >= dx1 && mx <= dx1+5 && mousePress === 0 ) {
            cursorClass = 'nw-resize';
            action = 'resize';
        }
        else if( my >= dy1 && my <= dy1+5 && mx <= dx2 && mx >= dx2-5 && mousePress === 0 ) {
            cursorClass = 'ne-resize';
            action = 'resize';
        }
        else if( my <= dy2 && my >= dy2-5 && mx <= dx2 && mx >= dx2-5 && mousePress === 0 ) {
            cursorClass = 'se-resize';
            action = 'resize';
        }
        else if( my <= dy2 && my >= dy2-5 && mx >= dx1 && mx <= dx1+5 && mousePress === 0 ) {
            cursorClass = 'sw-resize';
            action = 'resize';
        }
        else if( mx >= dx1 && mx <= dx1+5 && mousePress === 0 ) {
            cursorClass = 'w-resize';
            action = 'resize';
        }
        else if( mx <= dx2 && mx >= dx2-5 && mousePress === 0 ) {
            cursorClass = 'e-resize';
            action = 'resize';
        }
        else if( my >= dy1 && my <= dy1+5 && mousePress === 0 ) {
            cursorClass = 'n-resize';
            action = 'resize';
        }
        else if( my <= dy2 && my >= dy2-5 && mousePress === 0 ) {
            cursorClass = 's-resize';
            action = 'resize';
        }
        draggable.classList.remove(...cursorClasses);
        draggable.classList.add(cursorClass);
    };

    draggable.addEventListener('mousedown', dMouseDown);
    draggable.addEventListener('mouseup', dMouseUp);
    draggable.addEventListener('mousemove', dMouseInside);
})();