import cloudinary.uploader
from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Song, Playlist
from .serializers import SongSerializer, PlaylistSerializer

class SongListView(generics.ListAPIView):
    queryset = Song.objects.all().order_by('-uploaded_at')
    serializer_class = SongSerializer
    permission_classes = [permissions.IsAuthenticated]

class SongUploadView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def post(self, request):
        audio = request.FILES.get('audio_file')
        cover = request.FILES.get('cover_image')
        audio_up = cloudinary.uploader.upload(audio, resource_type='video', folder='spotify/songs')
        cover_up = cloudinary.uploader.upload(cover, folder='spotify/covers') if cover else {}
        song = Song.objects.create(
            title=request.data.get('title'),
            artist=request.data.get('artist'),
            audio_url=audio_up.get('secure_url', ''),
            cover_url=cover_up.get('secure_url', ''),
            cloudinary_audio_id=audio_up.get('public_id', ''),
        )
        return Response(SongSerializer(song).data, status=status.HTTP_201_CREATED)

class PlaylistListCreateView(generics.ListCreateAPIView):
    serializer_class = PlaylistSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Playlist.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)