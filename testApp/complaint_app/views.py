from rest_framework import viewsets
from .models import UserProfile, Complaint
from .serializers import UserSerializer, UserProfileSerializer, ComplaintSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from datetime import date

# Create your views here.
# class HomeViewSet(viewsets.ModelViewSet):
#   queryset = UserProfile.objects.all()
#   serializer_class = UserProfileSerializer(queryset, many=True)
#     def list(self, request):
#       return Response()

class ComplaintViewSet(viewsets.ModelViewSet):
  http_method_names = ['get']
  queryset = Complaint.objects.all()
  # print('queryset:', queryset)
  serializer_class = ComplaintSerializer(queryset, many=True)
  def list(self, request):
    # Get all complaints from the user's district    
    return Response(self.serializer_class.data)

  # @action(methods=['get'], detail=True)
  # def openCases(self, request):
  #   newest = self.get_queryset().order_by('closedate').last()
  #   queryset = self.get_queryset()

    

class OpenCasesViewSet(viewsets.ModelViewSet):
  http_method_names = ['get']
  first = Complaint.objects.all().order_by('closedate').last()
  serializer = ComplaintSerializer(first, many=False)
  # queryset = Complaint.objects.all()
  # serializer_class = ComplaintSerializer(queryset, many=True)
  # serializer_class = ComplaintSerializer
  # def openCases(self, request):
  # @action(methods=['get'], detail=True)
  def list(self, request):
    return Response(self.serializer.data)
    
  #   # Get only the open complaints from the user's district
  #   # newest = self.get_queryset().order_by('closedate').last()
  #   # queryset = self.get_queryset()
  #   t = date.today()
  #   month = date.strftime(t)
  #   year = t.year
  #   title = f"MyClub Event Calendar {(month,year)}"

  #   # serializer = self.get_serializer_class()(open)
  #   # first_data = self.serializer_class.data[0]
    
  #   # open = None
  #   # for open_cases in Complaint.objects.all():
  #   #   if open_cases.opendate is not None:
  #   #     open = 
  #   # all = self.get_queryset()
  #   # obj = get_object_or_404(all, pk=pk)
  #   # return Response(serializer.data)


class ClosedCasesViewSet(viewsets.ModelViewSet):
  http_method_names = ['get'] 
  def list(self, request):
    # Get only complaints that are close from the user's district
    return Response()
    
class TopComplaintTypeViewSet(viewsets.ModelViewSet):
  http_method_names = ['get']
  def list(self, request):
    # Get the top 3 complaint types from the user's district
    return Response()



# class HomeViewSet(viewsets.ModelViewSet):
#   queryset = UserProfile.objects.all()
#   serializer_class = UserProfileSerializer(queryset, many=True)
#     def list(self, request):
#       return Response()