"use client";

import { differenceInMinutes, parse } from "date-fns";
import { useEffect, useState } from "react";
import { Icons } from "./icons";

export function TimeRangeInput({
	value,
	onChange,
}: {
	value: { start: string | undefined; stop: string | undefined };
	onChange: (value: { start: string; stop: string }) => void;
}) {
	// Ensure we never have undefined values for controlled inputs
	const [startTime, setStartTime] = useState(value.start || "");
	const [stopTime, setStopTime] = useState(value.stop || "");
	const [duration, setDuration] = useState("");

	useEffect(() => {
		setStartTime(value.start || "");
		setStopTime(value.stop || "");
	}, [value]);

	useEffect(() => {
		if (!startTime || !stopTime) {
			return;
		}

		const start = parse(startTime, "HH:mm", new Date());
		const stop = parse(stopTime, "HH:mm", new Date());
		const diff = differenceInMinutes(stop, start);
		const hours = Math.floor(diff / 60);
		const minutes = diff % 60;
		setDuration(`${hours}h ${minutes}min`);
	}, [startTime, stopTime]);

	return (
		<div className="flex w-full items-center border border-border px-4 py-2">
			<div className="flex flex-1 items-center space-x-2">
				<Icons.Time className="h-5 w-5 text-[#878787]" />
				<input
					type="time"
					value={startTime}
					onChange={(e) => {
						setStartTime(e.target.value);
						onChange({ start: e.target.value, stop: stopTime });
					}}
					className="bg-transparent text-sm focus:outline-none"
				/>
			</div>
			<div className="mx-4 flex flex-shrink-0 items-center justify-center">
				<Icons.ArrowRightAlt className="h-5 w-5 text-[#878787]" />
			</div>
			<div className="flex flex-1 items-center justify-end space-x-2">
				<input
					type="time"
					value={stopTime}
					onChange={(e) => {
						setStopTime(e.target.value);
						onChange({ start: startTime, stop: e.target.value });
					}}
					className="bg-transparent text-sm focus:outline-none"
				/>
				<span className="text-[#878787] text-sm">{duration}</span>
			</div>
		</div>
	);
}
