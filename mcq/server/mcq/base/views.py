from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import random
from .models import Question
from .serializers import QuestionSerializer

@api_view(['GET'])
def generate_question(request):
    questions = Question.objects.all()
    if len(questions) < 5:
        return Response("Not enough questions in the database.", status=status.HTTP_400_BAD_REQUEST)
    random_questions = random.sample(list(questions), 5)
    serializer = QuestionSerializer(random_questions, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def submit_answer(request):
    user_answers = request.data.get('user_answers', [])
    questions = Question.objects.filter(id__in=[answer['question_id'] for answer in user_answers])
    score = 0
    for question in questions:
        answer = next((ans['selected_choice'] for ans in user_answers if ans['question_id'] == question.id), None)
        if answer and answer == question.correct_choice:
            score += 1
    return Response({'score': score, 'total_questions': len(questions)})
