export const getStatusColor = (status) => {
    if (!status) return 'text-muted-foreground border-muted';
    switch (status.toLowerCase()) {
      case 'high priority':
      case 'critical':
        return 'text-white bg-destructive border-destructive';
      case 'in progress':
        return 'text-white bg-primary';
      case 'planned':
        return 'text-primary bg-secondary border-secondary';
      case 'under review':
        return 'text-primary border-primary';
      case 'completed':
        return 'text-white bg-green-600 border-green-600';
      default:
        return 'text-secondary border-border';
    }
  };
  