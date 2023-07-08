from django.db import models
import uuid

class Question(models.Model):
    question_text = models.CharField(max_length=200)
    choice1 = models.CharField(max_length=50)
    choice2 = models.CharField(max_length=50)
    choice3 = models.CharField(max_length=50)
    choice4 = models.CharField(max_length=50)
    correct_choice = models.CharField(max_length=100)
    refid = models.CharField(max_length=200)
    
    def __str__(self):
        return self.question_text
