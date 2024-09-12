import CryptographyQuestions from "@/components/questions/CryptographyQuestions";
import ForensicQuestions from "@/components/questions/ForensicQuestions";
import GeneralQuestions from "@/components/questions/GeneralQuestions";
import ReverseEngineeringQuestions from "@/components/questions/ReverseEngineeringQuestions";
import WebExpoQuestions from "@/components/questions/WebExpoQuestions";

export default function QuestionPage() {
	return (
		<div>
			<GeneralQuestions />
			<CryptographyQuestions />
			<ForensicQuestions />
			<WebExpoQuestions />
			<ReverseEngineeringQuestions />
		</div>
	);
}
