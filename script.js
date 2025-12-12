// ==================== 音乐播放器类 ====================
class MusicPlayer {
    constructor() {
        // 初始化音频播放器
        this.audio = document.getElementById('audioPlayer');
        
        // 播放列表数据（模拟数据）
        this.playlist = this.generatePlaylist();
        
        // 当前播放索引
        this.currentIndex = -1;
        
        // 播放模式: 'normal', 'shuffle', 'repeat'
        this.playMode = 'normal';
        
        // 是否正在播放
        this.isPlaying = false;
        
        // 当前音量
        this.volume = 100;
        
        // 获取DOM元素
        this.initElements();
        
        // 绑定事件
        this.bindEvents();
        
        // 初始化播放列表
        this.renderPlaylist();
        
        // 启动可视化动画
        this.startVisualizer();
    }

    // ==================== 初始化DOM元素引用 ====================
    initElements() {
        // 播放器元素
        this.albumArt = document.getElementById('albumArt');
        this.songTitle = document.getElementById('songTitle');
        this.songArtist = document.getElementById('songArtist');
        this.songAlbum = document.getElementById('songAlbum');
        this.vinylRecord = document.querySelector('.vinyl-record');
        
        // 时间显示
        this.currentTime = document.getElementById('currentTime');
        this.totalTime = document.getElementById('totalTime');
        
        // 进度条
        this.progressBar = document.getElementById('progressBar');
        this.progressFill = document.getElementById('progressFill');
        this.progressHandle = document.getElementById('progressHandle');
        
        // 控制按钮
        this.playBtn = document.getElementById('playBtn');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.shuffleBtn = document.getElementById('shuffleBtn');
        this.repeatBtn = document.getElementById('repeatBtn');
        
        // 音量控制
        this.volumeBar = document.getElementById('volumeBar');
        this.volumeFill = document.getElementById('volumeFill');
        this.volumeIcon = document.getElementById('volumeIcon');
        this.volumeValue = document.getElementById('volumeValue');
        
        // 视图切换
        this.navButtons = document.querySelectorAll('.nav-btn');
        this.views = document.querySelectorAll('.view');
        
        // 播放列表
        this.playlistContainer = document.getElementById('playlistContainer');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        
        // 搜索
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.searchResults = document.getElementById('searchResults');
        
        // 迷你播放器
        this.miniCover = document.getElementById('miniCover');
        this.miniTitle = document.getElementById('miniTitle');
        this.miniArtist = document.getElementById('miniArtist');
        this.miniPlayBtn = document.getElementById('miniPlayBtn');
        this.miniPrevBtn = document.getElementById('miniPrevBtn');
        this.miniNextBtn = document.getElementById('miniNextBtn');
        this.miniProgressFill = document.getElementById('miniProgressFill');
    }

    // ==================== 生成模拟播放列表 ====================
    generatePlaylist() {
        return [
            {
                id: 1,
                title: '夜空中最亮的星',
                artist: '逃跑计划',
                album: '世界',
                genre: '流行',
                duration: 245,
                cover: 'https://via.placeholder.com/300/e74c3c/ffffff?text=专辑封面1'
            },
            {
                id: 2,
                title: 'Fade',
                artist: 'Alan Walker',
                album: 'Different World',
                genre: '电子',
                duration: 212,
                cover: 'https://via.placeholder.com/300/c0392b/ffffff?text=专辑封面2'
            },
            {
                id: 3,
                title: '海阔天空',
                artist: 'Beyond',
                album: '乐与怒',
                genre: '摇滚',
                duration: 326,
                cover: 'https://via.placeholder.com/300/e74c3c/ffffff?text=专辑封面3'
            },
            {
                id: 4,
                title: 'Shape of You',
                artist: 'Ed Sheeran',
                album: '÷ (Divide)',
                genre: '流行',
                duration: 234,
                cover: 'https://via.placeholder.com/300/c0392b/ffffff?text=专辑封面4'
            },
            {
                id: 5,
                title: '成都',
                artist: '赵雷',
                album: '无法长大',
                genre: '民谣',
                duration: 327,
                cover: 'https://via.placeholder.com/300/e74c3c/ffffff?text=专辑封面5'
            },
            {
                id: 6,
                title: 'Canon in D',
                artist: 'Johann Pachelbel',
                album: 'Classical Masterpieces',
                genre: '古典',
                duration: 305,
                cover: 'https://via.placeholder.com/300/c0392b/ffffff?text=专辑封面6'
            },
            {
                id: 7,
                title: 'Faded',
                artist: 'Alan Walker',
                album: 'Different World',
                genre: '电子',
                duration: 212,
                cover: 'https://via.placeholder.com/300/e74c3c/ffffff?text=专辑封面7'
            },
            {
                id: 8,
                title: '光年之外',
                artist: 'G.E.M. 邓紫棋',
                album: '光年之外',
                genre: '流行',
                duration: 245,
                cover: 'https://via.placeholder.com/300/c0392b/ffffff?text=专辑封面8'
            },
            {
                id: 9,
                title: 'Bohemian Rhapsody',
                artist: 'Queen',
                album: 'A Night at the Opera',
                genre: '摇滚',
                duration: 354,
                cover: 'https://via.placeholder.com/300/e74c3c/ffffff?text=专辑封面9'
            },
            {
                id: 10,
                title: '告白气球',
                artist: '周杰伦',
                album: '周杰伦的床边故事',
                genre: '流行',
                duration: 207,
                cover: 'https://via.placeholder.com/300/c0392b/ffffff?text=专辑封面10'
            }
        ];
    }

    // ==================== 绑定所有事件监听 ====================
    bindEvents() {
        // 播放/暂停
        this.playBtn.addEventListener('click', () => this.togglePlay());
        this.miniPlayBtn.addEventListener('click', () => this.togglePlay());
        
        // 上一首/下一首
        this.prevBtn.addEventListener('click', () => this.playPrevious());
        this.nextBtn.addEventListener('click', () => this.playNext());
        this.miniPrevBtn.addEventListener('click', () => this.playPrevious());
        this.miniNextBtn.addEventListener('click', () => this.playNext());
        
        // 播放模式切换
        this.shuffleBtn.addEventListener('click', () => this.toggleShuffle());
        this.repeatBtn.addEventListener('click', () => this.toggleRepeat());
        
        // 进度条拖动
        this.progressBar.addEventListener('click', (e) => this.seekTo(e));
        
        // 音量控制
        this.volumeBar.addEventListener('click', (e) => this.setVolume(e));
        this.volumeIcon.addEventListener('click', () => this.toggleMute());
        
        // 音频事件
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('ended', () => this.handleSongEnd());
        this.audio.addEventListener('loadedmetadata', () => this.updateDuration());
        
        // 视图切换
        this.navButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.switchView(e.target.dataset.view));
        });
        
        // 播放列表筛选
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.filterPlaylist(e.target.dataset.filter));
        });
        
        // 搜索功能
        this.searchBtn.addEventListener('click', () => this.performSearch());
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.performSearch();
        });
        
        // 实时搜索
        this.searchInput.addEventListener('input', () => this.performSearch());
    }

    // ==================== 播放/暂停切换 ====================
    togglePlay() {
        if (this.currentIndex === -1) {
            // 如果没有选择歌曲，播放第一首
            this.playSong(0);
        } else {
            if (this.isPlaying) {
                this.pause();
            } else {
                this.play();
            }
        }
    }

    // ==================== 播放指定歌曲 ====================
    playSong(index) {
        // 检查索引有效性
        if (index < 0 || index >= this.playlist.length) return;
        
        this.currentIndex = index;
        const song = this.playlist[index];
        
        // 更新界面
        this.updatePlayerUI(song);
        
        // 模拟音频加载（真实项目中应设置audio.src）
        // this.audio.src = song.audioUrl;
        
        // 开始播放
        this.play();
        
        // 更新播放列表高亮
        this.updatePlaylistHighlight();
    }

    // ==================== 播放 ====================
    play() {
        // this.audio.play(); // 真实播放
        this.isPlaying = true;
        this.playBtn.innerHTML = '<span>⏸️</span>';
        this.miniPlayBtn.innerHTML = '⏸️';
        this.vinylRecord.classList.add('spinning');
        
        // 模拟播放进度（真实项目中由audio自动更新）
        this.simulateProgress();
    }

    // ==================== 暂停 ====================
    pause() {
        // this.audio.pause(); // 真实暂停
        this.isPlaying = false;
        this.playBtn.innerHTML = '<span>▶️</span>';
        this.miniPlayBtn.innerHTML = '▶️';
        this.vinylRecord.classList.remove('spinning');
        
        // 停止模拟进度
        if (this.progressTimer) {
            clearInterval(this.progressTimer);
        }
    }

    // ==================== 上一首 ====================
    playPrevious() {
        if (this.currentIndex > 0) {
            this.playSong(this.currentIndex - 1);
        } else if (this.playMode === 'repeat') {
            this.playSong(this.playlist.length - 1);
        }
    }

    // ==================== 下一首 ====================
    playNext() {
        if (this.playMode === 'shuffle') {
            // 随机模式
            const randomIndex = Math.floor(Math.random() * this.playlist.length);
            this.playSong(randomIndex);
        } else if (this.currentIndex < this.playlist.length - 1) {
            this.playSong(this.currentIndex + 1);
        } else if (this.playMode === 'repeat') {
            this.playSong(0);
        }
    }

    // ==================== 歌曲结束处理 ====================
    handleSongEnd() {
        if (this.playMode === 'repeat') {
            // 单曲循环
            this.play();
        } else {
            this.playNext();
        }
    }

    // ==================== 更新播放器界面 ====================
    updatePlayerUI(song) {
        this.albumArt.src = song.cover;
        this.songTitle.textContent = song.title;
        this.songArtist.textContent = song.artist;
        this.songAlbum.textContent = song.album;
        
        // 更新迷你播放器
        this.miniCover.src = song.cover;
        this.miniTitle.textContent = song.title;
        this.miniArtist.textContent = song.artist;
    }

    // ==================== 模拟播放进度（演示用） ====================
    simulateProgress() {
        if (this.progressTimer) {
            clearInterval(this.progressTimer);
        }
        
        let currentSeconds = 0;
        const song = this.playlist[this.currentIndex];
        const totalSeconds = song.duration;
        
        this.progressTimer = setInterval(() => {
            if (currentSeconds >= totalSeconds) {
                this.handleSongEnd();
                clearInterval(this.progressTimer);
                return;
            }
            
            currentSeconds++;
            const progress = (currentSeconds / totalSeconds) * 100;
            
            this.progressFill.style.width = progress + '%';
            this.progressHandle.style.left = progress + '%';
            this.miniProgressFill.style.width = progress + '%';
            
            this.currentTime.textContent = this.formatTime(currentSeconds);
        }, 1000);
    }

    // ==================== 更新进度显示（真实音频） ====================
    updateProgress() {
        const current = this.audio.currentTime;
        const total = this.audio.duration;
        
        if (total) {
            const progress = (current / total) * 100;
            this.progressFill.style.width = progress + '%';
            this.progressHandle.style.left = progress + '%';
            this.miniProgressFill.style.width = progress + '%';
            
            this.currentTime.textContent = this.formatTime(current);
        }
    }

    // ==================== 更新总时长 ====================
    updateDuration() {
        const total = this.audio.duration;
        this.totalTime.textContent = this.formatTime(total);
    }

    // ==================== 进度条跳转 ====================
    seekTo(event) {
        const rect = this.progressBar.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const width = rect.width;
        const percentage = clickX / width;
        
        // const newTime = this.audio.duration * percentage;
        // this.audio.currentTime = newTime;
        
        // 模拟跳转（演示用）
        if (this.playlist[this.currentIndex]) {
            const newTime = this.playlist[this.currentIndex].duration * percentage;
            console.log('跳转到:', this.formatTime(newTime));
        }
    }

    // ==================== 设置音量 ====================
    setVolume(event) {
        const rect = this.volumeBar.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const width = rect.width;
        const percentage = Math.max(0, Math.min(1, clickX / width));
        
        this.volume = Math.round(percentage * 100);
        this.volumeFill.style.width = this.volume + '%';
        this.volumeValue.textContent = this.volume;
        
        // this.audio.volume = percentage; // 真实设置
        
        // 更新图标
        this.updateVolumeIcon();
    }

    // ==================== 静音切换 ====================
    toggleMute() {
        if (this.volume > 0) {
            this.previousVolume = this.volume;
            this.volume = 0;
        } else {
            this.volume = this.previousVolume || 100;
        }
        
        this.volumeFill.style.width = this.volume + '%';
        this.volumeValue.textContent = this.volume;
        this.updateVolumeIcon();
    }

    // ==================== 更新音量图标 ====================
    updateVolumeIcon() {
        if (this.volume === 0) {
            this.volumeIcon.textContent = '🔇';
        } else if (this.volume < 50) {
            this.volumeIcon.textContent = '🔉';
        } else {
            this.volumeIcon.textContent = '🔊';
        }
    }

    // ==================== 切换随机播放 ====================
    toggleShuffle() {
        if (this.playMode === 'shuffle') {
            this.playMode = 'normal';
            this.shuffleBtn.classList.remove('active');
        } else {
            this.playMode = 'shuffle';
            this.shuffleBtn.classList.add('active');
            this.repeatBtn.classList.remove('active');
        }
    }

    // ==================== 切换循环播放 ====================
    toggleRepeat() {
        if (this.playMode === 'repeat') {
            this.playMode = 'normal';
            this.repeatBtn.classList.remove('active');
        } else {
            this.playMode = 'repeat';
            this.repeatBtn.classList.add('active');
            this.shuffleBtn.classList.remove('active');
        }
    }

    // ==================== 时间格式化 ====================
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // ==================== 渲染播放列表 ====================
    renderPlaylist(songs = this.playlist) {
        this.playlistContainer.innerHTML = '';
        
        songs.forEach((song, index) => {
            const songItem = document.createElement('div');
            songItem.className = 'song-item';
            songItem.innerHTML = `
                <img src="${song.cover}" alt="${song.title}" class="song-cover">
                <div class="song-details">
                    <div class="song-name">${song.title}</div>
                    <div class="song-meta">${song.artist} · ${song.album}</div>
                </div>
                <div class="song-duration">${this.formatTime(song.duration)}</div>
                <div class="song-actions">
                    <button class="action-btn" title="播放">▶️</button>
                    <button class="action-btn" title="喜欢">❤️</button>
                </div>
            `;
            
            // 点击播放
            songItem.addEventListener('click', (e) => {
                if (!e.target.classList.contains('action-btn')) {
                    const realIndex = this.playlist.indexOf(song);
                    this.playSong(realIndex);
                }
            });
            
            this.playlistContainer.appendChild(songItem);
        });
        
        // 更新统计信息
        this.updatePlaylistStats(songs);
    }

    // ==================== 更新播放列表统计 ====================
    updatePlaylistStats(songs) {
        const totalSongs = songs.length;
        const totalSeconds = songs.reduce((sum, song) => sum + song.duration, 0);
        
        document.getElementById('totalSongs').textContent = totalSongs;
        document.getElementById('totalDuration').textContent = this.formatTime(totalSeconds);
    }

    // ==================== 更新播放列表高亮 ====================
    updatePlaylistHighlight() {
        const items = this.playlistContainer.querySelectorAll('.song-item');
        items.forEach((item, index) => {
            if (index === this.currentIndex) {
                item.classList.add('playing');
            } else {
                item.classList.remove('playing');
            }
        });
    }

    // ==================== 筛选播放列表 ====================
    filterPlaylist(genre) {
        // 更新按钮状态
        this.filterButtons.forEach(btn => {
            if (btn.dataset.filter === genre) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // 筛选歌曲
        let filteredSongs;
        if (genre === 'all') {
            filteredSongs = this.playlist;
        } else {
            filteredSongs = this.playlist.filter(song => song.genre === genre);
        }
        
        this.renderPlaylist(filteredSongs);
    }

    // ==================== 执行搜索 ====================
    performSearch() {
        const keyword = this.searchInput.value.trim().toLowerCase();
        
        if (keyword === '') {
            this.searchResults.innerHTML = `
                <div class="search-empty">
                    <span class="empty-icon">🎧</span>
                    <p>输入关键词搜索您喜欢的音乐</p>
                </div>
            `;
            return;
        }
        
        // 搜索匹配的歌曲
        const results = this.playlist.filter(song => 
            song.title.toLowerCase().includes(keyword) ||
            song.artist.toLowerCase().includes(keyword) ||
            song.album.toLowerCase().includes(keyword)
        );
        
        if (results.length === 0) {
            this.searchResults.innerHTML = `
                <div class="search-empty">
                    <span class="empty-icon">😢</span>
                    <p>未找到与 "${keyword}" 相关的歌曲</p>
                </div>
            `;
        } else {
            this.renderSearchResults(results);
        }
    }

    // ==================== 渲染搜索结果 ====================
    renderSearchResults(results) {
        this.searchResults.innerHTML = '';
        
        results.forEach(song => {
            const songItem = document.createElement('div');
            songItem.className = 'song-item';
            songItem.innerHTML = `
                <img src="${song.cover}" alt="${song.title}" class="song-cover">
                <div class="song-details">
                    <div class="song-name">${song.title}</div>
                    <div class="song-meta">${song.artist} · ${song.album}</div>
                </div>
                <div class="song-duration">${this.formatTime(song.duration)}</div>
                <div class="song-actions">
                    <button class="action-btn" title="播放">▶️</button>
                    <button class="action-btn" title="喜欢">❤️</button>
                </div>
            `;
            
            songItem.addEventListener('click', (e) => {
                if (!e.target.classList.contains('action-btn')) {
                    const realIndex = this.playlist.indexOf(song);
                    this.playSong(realIndex);
                    this.switchView('player');
                }
            });
            
            this.searchResults.appendChild(songItem);
        });
    }

    // ==================== 切换视图 ====================
    switchView(viewName) {
        // 更新导航按钮
        this.navButtons.forEach(btn => {
            if (btn.dataset.view === viewName) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // 切换视图
        this.views.forEach(view => {
            if (view.id === viewName + 'View') {
                view.classList.add('active');
            } else {
                view.classList.remove('active');
            }
        });
    }

    // ==================== 启动可视化动画 ====================
    startVisualizer() {
        const bars = document.querySelectorAll('.visualizer .bar');
        
        setInterval(() => {
            if (this.isPlaying) {
                bars.forEach(bar => {
                    const height = Math.random() * 60 + 20;
                    bar.style.height = height + 'px';
                });
            } else {
                bars.forEach(bar => {
                    bar.style.height = '20px';
                });
            }
        }, 200);
    }
}

// ==================== 初始化应用 ====================
document.addEventListener('DOMContentLoaded', () => {
    const player = new MusicPlayer();
    console.log('🎵 音乐播放器已启动');
});
