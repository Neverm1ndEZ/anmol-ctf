import React, { ReactNode } from "react";

interface QuestionLayoutProps {
	children: ReactNode;
}

export default function QuestionLayout({ children }: QuestionLayoutProps) {
	return <div className="bg-gray-900 h-full min-h-screen">{children}</div>;
}
