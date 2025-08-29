import React, { createContext, useContext, useState, useEffect } from 'react';

export interface SelectedPlan {
  id: string;
  name: string;
  country: string;
  image: string;
  emotionalMatch: string;
  matchPercentage: number;
  description: string;
  culturalHighlights: string[];
  safetyLevel: 'low' | 'medium' | 'high';
  bestTime: string;
  priceRange: '$' | '$$' | '$$$';
  status: 'selected' | 'ongoing' | 'completed';
  dateAdded: string;
  region: 'Tamil Nadu' | 'Kerala' | 'Bangalore';
}

interface PlanContextType {
  selectedPlans: SelectedPlan[];
  addPlan: (plan: Omit<SelectedPlan, 'id' | 'dateAdded' | 'status'>) => void;
  removePlan: (id: string) => void;
  updatePlanStatus: (id: string, status: SelectedPlan['status']) => void;
  getPlansByStatus: (status: SelectedPlan['status']) => SelectedPlan[];
  getPlansByRegion: (region: string) => SelectedPlan[];
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const usePlans = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error('usePlans must be used within a PlanProvider');
  }
  return context;
};

export const PlanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedPlans, setSelectedPlans] = useState<SelectedPlan[]>([]);

  // Load plans from localStorage on mount
  useEffect(() => {
    const savedPlans = localStorage.getItem('selectedPlans');
    if (savedPlans) {
      setSelectedPlans(JSON.parse(savedPlans));
    }
  }, []);

  // Save plans to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('selectedPlans', JSON.stringify(selectedPlans));
  }, [selectedPlans]);

  const addPlan = (plan: Omit<SelectedPlan, 'id' | 'dateAdded' | 'status'>) => {
    const newPlan: SelectedPlan = {
      ...plan,
      id: `${plan.name}-${Date.now()}`,
      dateAdded: new Date().toISOString(),
      status: 'selected'
    };
    
    // Check if plan already exists
    const existingPlan = selectedPlans.find(p => p.name === plan.name && p.region === plan.region);
    if (!existingPlan) {
      setSelectedPlans(prev => [...prev, newPlan]);
    }
  };

  const removePlan = (id: string) => {
    setSelectedPlans(prev => prev.filter(plan => plan.id !== id));
  };

  const updatePlanStatus = (id: string, status: SelectedPlan['status']) => {
    setSelectedPlans(prev => 
      prev.map(plan => 
        plan.id === id ? { ...plan, status } : plan
      )
    );
  };

  const getPlansByStatus = (status: SelectedPlan['status']) => {
    return selectedPlans.filter(plan => plan.status === status);
  };

  const getPlansByRegion = (region: string) => {
    return selectedPlans.filter(plan => plan.region === region);
  };

  const value = {
    selectedPlans,
    addPlan,
    removePlan,
    updatePlanStatus,
    getPlansByStatus,
    getPlansByRegion
  };

  return (
    <PlanContext.Provider value={value}>
      {children}
    </PlanContext.Provider>
  );
};