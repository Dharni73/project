from django.urls import path
from .views import generate_question, submit_answer

urlpatterns = [
    path('api/generate/', generate_question, name='generate_question'),
    path('api/submit/', submit_answer, name='submit_answer'),
]
