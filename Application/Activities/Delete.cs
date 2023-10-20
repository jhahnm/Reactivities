using Application.Core;
using MediatR;
using Persistence;

namespace Application.Activities;

public class Delete
{
    public class Command: IRequest<Result<Unit>>
    {
        public Guid Id { get; set; }
    }
    
    public class Handler: IRequestHandler<Command, Result<Unit>>
    {
        private readonly DataContext _context;

        public Handler(DataContext context)
        {
            _context = context;
        }
        
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities.FindAsync(request.Id);
            if (activity == null) return null;
            _context.Remove(activity);
            if (!(await _context.SaveChangesAsync(cancellationToken) > 0))
            {
                return Result<Unit>.Failure("Not able to delete activity");
            }

            return Result<Unit>.Success(Unit.Value);
        }
    }
}