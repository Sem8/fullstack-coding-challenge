from rest_framework import viewsets
from .models import UserProfile, Complaint
from .serializers import UserSerializer, UserProfileSerializer, ComplaintSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from django.contrib.auth.models import User

# Create your views here.

# My_queries --
# Programmer.objects.filter(age__isnull=True)
# Car.objects.filter(name='Camry')
# Programmer.objects.count()
# Programmer.objects.filter(name__endswith='y').count()
# Programmer.objects.exclude(name__endswith='y').count()

# class LeadViewSet(viewsets.ModelViewSet):
#     permission_classes = [
#         permissions.IsAuthenticated,
#     ]
#     serializer_class = LeadSerializer

#     def get_queryset(self):
#         return self.request.user.leads.all()

#     def perform_create(self, serializer):
#         serializer.save(owner=self.request.user)


class ComplaintViewSet(viewsets.ModelViewSet):
  http_method_names = ['get']

  queryset = Complaint.objects.all()
  serializer_class = ComplaintSerializer(queryset, many=True)
  # count = Complaint.objects.count()

  def list(self, request):
    # Get all complaints from the user's district
    return Response(self.serializer_class.data)    
    # return Response(self.serializer_class.data)
       

class OpenCasesViewSet(viewsets.ModelViewSet):
  http_method_names = ['get']
  queryset = Complaint.objects.filter(closedate__isnull=True)
  serializer_class = ComplaintSerializer(queryset, many=True)
  # count = Complaint.objects.filter(closedate__isnull=True).count()

  def list(self, request):
    return Response(self.serializer_class.data)



class ClosedCasesViewSet(viewsets.ModelViewSet):
  http_method_names = ['get']

  queryset = Complaint.objects.filter(closedate__isnull=False)
  serializer_class = ComplaintSerializer(queryset, many=True)
  # count = Complaint.objects.filter(closedate__isnull=False).count() 

  def list(self, request):
    # Get only complaints that are close from the user's district
    return Response(self.serializer_class.data)

    
class TopComplaintTypeViewSet(viewsets.ModelViewSet):
  http_method_names = ['get']

  hashTable = {}

  # complaint_types = Complaint.objects.filter(complaint_type__isnull=False).values('complaint_type')
  complaint_types = Complaint.objects.values('complaint_type', 'account').filter(complaint_type__isnull=False)

  # count = Complaint.objects.all().values('complaint_type').count()
  for each_complaint in complaint_types:
    # print('each_complaint: ', each_complaint)
    hashTable[each_complaint['complaint_type']] = {'account': each_complaint['account'], 'count': 1}

  for each_complaint_counter in complaint_types:    
    hashTable[each_complaint_counter['complaint_type']]['count'] += 1 
  
  counts_list = hashTable.items()
  
  # sorted_counts_list = sorted(counts_list['count'])
  # serializer_class = ComplaintSerializer(complaint_types, many=True)

  def list(self, request):
    # Get the top 3 complaint types from the user's district
    return Response(self.counts_list)


class UserViewSet(viewsets.ModelViewSet):
  user_profile_queryset = UserProfile.objects.all()
  user_profile_serializer = UserProfileSerializer(user_profile_queryset, many=True)

  user_queryset = User.objects.all()
  user_serializer = UserSerializer(user_queryset, many=True)

  user_info = []
  # for user_profile in user_profile_queryset:
  #   print('profile', user_profile)

  # for user in user_queryset:
  #   print('user', user)
  
  def list(self, request):
    return Response(self.user_profile_serializer.data)