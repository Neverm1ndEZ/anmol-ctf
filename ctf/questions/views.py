from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Questions
from .serializers import QuestionsSerializer

@api_view(['GET', 'POST'])
def getAll(request,cat):
    if request.method == 'GET':
        questions = Questions.objects.filter(type=cat)
        serializer = QuestionsSerializer(questions, many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

@api_view(['POST'])
def postOne(request):
    if request.method == 'POST':
        serializer = QuestionsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def getOne(request, pk):
    try:
        question = Questions.objects.get(pk=pk)
    except Questions.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = QuestionsSerializer(question)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = QuestionsSerializer(question, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        question.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
def checkAnswer(request, pk):
    try:
        question = Questions.objects.get(pk=pk)
    except Questions.DoesNotExist:
        return Response({"error": "Question not found"}, status=status.HTTP_404_NOT_FOUND)
    
    provided_answer = request.data.get('answer')
    if provided_answer is None:
        return Response({"error": "Answer is required"}, status=status.HTTP_400_BAD_REQUEST)
    
    if question.answer == provided_answer:
        return Response({"message": "Correct answer!"}, status=status.HTTP_200_OK)
    else:
        return Response({"message": "Incorrect answer. Try again!"}, status=status.HTTP_400_BAD_REQUEST)