from django.urls import path
from .views import get_all_books
from .views import create_book
from .views import book_details

urlpatterns = [
    path('books/', get_all_books, name='all-books'),
    path('books/create/', create_book, name ="create"),
    path('books/detail/<int:pk>', book_details, name ="detail"),

]