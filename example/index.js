document.body.addEventListener("click", (event) => {
    // 无残影
    // addAnimation({x: event.clientX, y:event.clientY});
    // 有残影
    ghost({x: event.clientX, y:event.clientY}, '', '', 5);
});

// 生成有动态模糊的小球 需要传入 1.初始坐标 2.结束点坐标 3.动画执行时长 4.残影小球个数
ghost = (startPosition, endPosition, time, num) => {
    for (let i = 0; i < num; i++) {
        this.addAnimation(startPosition, endPosition, time, i / (num + 1), true);
    }
}

// 生成普通的小球 传入 1.初始坐标 2.结束点坐标 3.动画执行时长
addAnimation = (startPosition = { x: 0, y: 0 }, endPosition, time, num, ghost = false) => {
    let item = document.createElement('div');
    !ghost ? item.className = 'myAnimation' : item.className = 'ghost';
    item.style.top = startPosition.y + 'px';
    item.style.left = startPosition.x + 'px';
    document.body.appendChild(item);

    // 目的地
    const targetTop = endPosition.y || document.body.offsetHeight;
    const targetLeft = endPosition.x || document.body.offsetWidth;

    // 采用固定动画时长方式
    // 前者为动画预计执行时间 (非真正看到的动画时间正相关)
    // 后者为每次动画执行间隔 (以普通60Hz的显示器为示范，每次刷新的间隔为 1/60 s)
    let Time = time /0.016 || (0.8 / 0.016);

    let Xspeed = (targetLeft - (startPosition.x)) / Time;
    let Yspeed = -5;

    // 设置一个加速度A  已知 L = 0.5 * A * T * T + Y * T
    let A = (2 * (targetTop - (startPosition.y) - Yspeed * Time)) / (Time * Time);

    // 时间单位 用以配合加速度计算当前速度 speed = Yspeed + A * T
    let loop = 0;
    let nowX  = startPosition.x;
    let nowY  = startPosition.y;

    // 解决少数浏览器兼容性问题
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (fn, t = 16.6) => {
            setTimeout(fn, t);
        };
    }
    // 执行动画
    let move = () => {
        // 判断是否要停止
        if (nowY >= targetTop) {
            // 停止 隐藏 销毁 退出
            item.remove();
            return;
        }
        // 根据当前速度 计算最新位置
        nowX += Xspeed;
        nowY += (A * loop + Yspeed);
        Timer = requestAnimationFrame(() => {
            item.style.top = Math.min(nowY, targetTop) + 'px';
            item.style.left = Math.min(nowX, targetLeft) + 'px';
            loop++;
            if (ghost) {
                item.style.transform = `translate(${-(num * Xspeed)}px ,${-(num * (A * loop + Yspeed))}px)`;
                item.style.opacity = (1 - num) * 0.5;
            }
            move();
        });
    };
    move();
}