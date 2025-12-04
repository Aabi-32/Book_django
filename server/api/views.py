from django.shortcuts import render
from rest_framework.decorators import api_view , permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .models import Book
from .serieliser import Bookserialiser




# Create your views here.

@api_view(['GET'])
def get_all_books(request):
    books = Book.objects.all()
    serializer = Bookserialiser(books, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_book(request):
   book = request.data
   serializer = Bookserialiser(data=book)
   if serializer.is_valid():
       serializer.save()
       return Response(serializer.data, status=status.HTTP_201_CREATED)
   return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE'])
def book_details(request, pk):
     
    try:
         book = Book.objects.get(id=pk)

    except Book.DoesNotExist:
        return Response({"error": "The book is not found "}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'PUT':
        data = request.data 
        sereliazer = Bookserialiser(book, data=data, partial=True)
        if sereliazer.is_valid():
            sereliazer.save()
            return Response(sereliazer.data)
        else:
          return  Response(sereliazer.error, status= status.HTTP_400_BAD_REQUEST)   


    elif request.method == 'DELETE':
        book.delete()
        return Response({"Message": "the book is deleted"})