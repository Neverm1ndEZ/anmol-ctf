import axios from "axios";

export const getQuestions = async ({
	questionNumber,
}: {
	questionNumber: number;
}) => {
	const response = await axios.get(
		`${process.env.NEXT_PUBLIC_API_URL}/ques/one/${questionNumber}`,
	);
	return response.data;
};
