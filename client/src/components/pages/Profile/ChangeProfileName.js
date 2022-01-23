import React, {useEffect, useState} from "react

const ChangeProfileName = (props) => {
	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit, onError)}>
				<div>
					Friend code if you have one (or leave blank if you don't have one):
				</div>
				<Controller
					control={control}
					name="otherID"
					render={({ field: { onChange, onBlur, value, ref } }) => (
						<Input placeholder="Code (ask you friend for their code, which is located under their profile)	" style={{ width: 400 }}
							onChange={onChange}
							onBlur={onBlur}
							selected={value} />
					)}
				/>
				<div>
					You want at most this many days between interactions with your friend:
				</div>
				<Controller
					control={control}
					name="goalFrequency"
					render={({ field: { onChange, onBlur, value, ref } }) => (
						<Input placeholder="Goal frequency" style={{ width: 400 }}
							onChange={onChange}
							onBlur={onBlur}
							selected={value} />
					)}
				/>
				<div>
					<input type="submit" />
				</div>
			</form>
		</div>
	);	
};


export default ChangeProfileName;