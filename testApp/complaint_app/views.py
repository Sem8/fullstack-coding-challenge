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
  cleanedHashTable = {}
  sortedHashTable = {}

  # complaint_types = Complaint.objects.filter(complaint_type__isnull=False).values('complaint_type')
  complaint_types = Complaint.objects.values('complaint_type', 'account').filter(complaint_type__isnull=False)

  for each_comp_dist in complaint_types:
    if each_comp_dist['account'] not in hashTable:
      hashTable[each_comp_dist['account']] = {each_comp_dist['complaint_type']: 0}
    else:
      if each_comp_dist['complaint_type'] not in hashTable[each_comp_dist['account']]:
        hashTable[each_comp_dist['account']][each_comp_dist['complaint_type']] = 0
      else:
        hashTable[each_comp_dist['account']][each_comp_dist['complaint_type']] += 1

  # hashTableItems = hashTable.items()
  hashTableItems = None

  

  for each_dist in hashTable:
    cleanedHashTable[each_dist] = {key:val for key, val in hashTable[each_dist].items() if val != 0}
    # cleanedHashTable[each_dist] = [[key, val] for key, val in hashTable[each_dist] if val != 0]
  
  for one_district in cleanedHashTable:
    cleanedHashTable[one_district] = sorted(cleanedHashTable[one_district].items(), key = lambda kv:(kv[1], kv[0]), reverse=True)

  # testing = cleanedHashTable 

  def list(self, request):
    # Get the top 3 complaint types from the user's district
    return Response(self.cleanedHashTable)


class ConstituentViewSet(viewsets.ModelViewSet):
  http_method_names = ['get']

  queryset = Complaint.objects.filter(council_dist__isnull=False).filter(complaint_type__isnull=False)
  serializer_class = ComplaintSerializer(queryset, many=True)
  # count = Complaint.objects.filter(closedate__isnull=False).count() 

  def list(self, request):
    # Get only complaints that are close from the user's district
    return Response(self.serializer_class.data)


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