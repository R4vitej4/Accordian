import React, { useState } from "react";
import data from "./data";
import "./style.css";
export default function Accordion() {
	const [selected, setSelected] = useState(null);
	const [enableMultiSelection, setenableMultiSelection] = useState(false);
	const [multiple, setMultiple] = useState([]);

	function singleSelection(id) {
		setSelected(id === selected ? null : id);
	}
	function handleMultiSelection(id) {
		let cpyMultiple = [...multiple];
		const findIndexOfId = cpyMultiple.indexOf(id);
		if(findIndexOfId === -1){
			cpyMultiple.push(id);
		}
		else{
			cpyMultiple.splice(findIndexOfId, 1);
		}
		setMultiple(cpyMultiple);
	}
	return (
		<div className="wrapper">
			<button
				onClick={() => setenableMultiSelection(!enableMultiSelection)}
			>
				{enableMultiSelection ? "Disable Multi Selection" : "Enable Multi Selection"}
			</button>
			<div className="accordion">
				{data && data.length ? (
					data.map((items) => (
						<div className="item">
							<div
								onClick={
									enableMultiSelection
										? () => handleMultiSelection(items.id)
										: () => singleSelection(items.id)
								}
								className="title"
							>
								<h3>{items.question}</h3>
								<span>+</span>
							</div>
							{
								enableMultiSelection ?
								multiple.indexOf(items.id)!== -1 && 
								(<div className="content">{items.answer}</div>)
								:
								selected === items.id && 
								(<div className="content">{items.answer}</div>)
								
							}
						</div>
					))
				) : (
					<div>No data found</div>
				)}
			</div>
		</div>
	);
}
