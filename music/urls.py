from django.urls import path
from .views import SongListView, SongUploadView, PlaylistListCreateView

urlpatterns = [
    path('songs/', SongListView.as_view(), name='song-list'),
    path('songs/upload/', SongUploadView.as_view(), name='song-upload'),
    path('playlists/', PlaylistListCreateView.as_view(), name='playlist-list'),
]