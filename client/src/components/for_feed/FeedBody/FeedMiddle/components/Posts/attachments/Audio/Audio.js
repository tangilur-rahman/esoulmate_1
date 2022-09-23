import { useRef, useState } from "react";
import "./Audio.css";

const Audio = ({ audio }) => {
	// state
	const [isPlaying, setIsPlaying] = useState(false);
	const [duration, setDuration] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);

	// references
	const audioPlayer = useRef(); // reference our audio component
	const progressBar = useRef(); // reference our progress bar
	const animationRef = useRef(); // reference the animation

	const onLoadedMetadata = () => {
		const seconds = Math.floor(audioPlayer.current.duration);
		setDuration(seconds);
		progressBar.current.max = seconds;
	};

	const calculateTime = (secs) => {
		const minutes = Math.floor(secs / 60);
		const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
		const seconds = Math.floor(secs % 60);
		const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
		return `${returnedMinutes}:${returnedSeconds}`;
	};

	const togglePlayPause = () => {
		const prevValue = isPlaying;
		setIsPlaying(!prevValue);
		if (!prevValue) {
			audioPlayer.current.play();
			animationRef.current = requestAnimationFrame(whilePlaying);
		} else {
			audioPlayer.current.pause();
			cancelAnimationFrame(animationRef.current);
		}
	};

	const whilePlaying = () => {
		progressBar.current.value = audioPlayer.current.currentTime;
		changePlayerCurrentTime();
		animationRef.current = requestAnimationFrame(whilePlaying);
	};

	const changeRange = () => {
		audioPlayer.current.currentTime = progressBar.current.value;
		changePlayerCurrentTime();
	};

	const changePlayerCurrentTime = () => {
		progressBar.current.style.setProperty(
			"--seek-before-width",
			`${(progressBar.current.value / duration) * 100}%`
		);
		setCurrentTime(progressBar.current.value);
	};

	const backThirty = () => {
		progressBar.current.value = Number(progressBar.current.value) - 10;
		changeRange();
	};

	const forwardThirty = () => {
		progressBar.current.value = Number(progressBar.current.value) + 10;
		changeRange();
	};
	return (
		<>
			<div className="audio-container">
				<div className={isPlaying ? "gif-container active" : "gif-container"}>
					{isPlaying ? (
						<img src="/assets/extra/wave.gif" alt="gif" />
					) : (
						<img src="/assets/extra/cd.png" alt="img" />
					)}

					<i className="bi bi-vinyl"></i>
				</div>

				<div className="audioPlayer">
					<div className="controller-container">
						{/* audio tag  */}
						<audio
							ref={audioPlayer}
							src={audio}
							preload="metadata"
							onLoadedMetadata={onLoadedMetadata}
						></audio>

						{/* backward button  */}
						<button
							className="forwardBackward title-tip"
							onClick={backThirty}
							title="10s backward"
						>
							<i className="bi bi-skip-backward-circle"></i>
						</button>

						{/* play-push button  */}
						<button onClick={togglePlayPause} className="playPause">
							{isPlaying ? (
								<i className="bi bi-pause-fill"></i>
							) : (
								<i className="bi bi-play play-btn"></i>
							)}
						</button>

						{/* forward button  */}
						<button
							className="forwardBackward title-tip"
							onClick={forwardThirty}
							title="10s forward"
						>
							<i className="bi bi-skip-forward-circle"></i>
						</button>
					</div>

					<div
						className={isPlaying ? "popup-container active" : "popup-container"}
					>
						<p>It's my life</p>
						<div className="duration-time">
							{/* current time */}
							<div className="currentTime">{calculateTime(currentTime)}</div>

							{/* duration */}
							<div className="duration">
								{duration && !isNaN(duration) && calculateTime(duration)}
							</div>
						</div>

						{/* progress bar */}
						<div>
							<input
								type="range"
								className="progressBar"
								defaultValue="0"
								ref={progressBar}
								onChange={changeRange}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Audio;
